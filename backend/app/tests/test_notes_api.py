from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import app


@pytest.fixture()
def client(tmp_path: Path):
    database_url = f"sqlite:///{tmp_path / 'test.db'}"
    engine = create_engine(
        database_url,
        connect_args={"check_same_thread": False},
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    yield TestClient(app)

    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)


def create_note(client: TestClient, **overrides):
    payload = {
        "title": "Transformer Attention",
        "summary": "A note about attention.",
        "original_content": "User: explain QKV. Assistant: QKV is used in attention.",
        "source": "ChatGPT",
        "knowledge_points": ["QKV calculation", "Attention score"],
        "tags": ["AI", "Transformer"],
    }
    payload.update(overrides)
    return client.post("/api/notes", json=payload)


def test_health_check(client: TestClient):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_create_note(client: TestClient):
    response = create_note(client)

    assert response.status_code == 201
    data = response.json()
    assert data["id"]
    assert data["title"] == "Transformer Attention"
    assert data["tags"] == ["AI", "Transformer"]
    assert data["knowledge_points"][0]["content"] == "QKV calculation"
    assert data["knowledge_points"][0]["order_index"] == 0


def test_list_notes(client: TestClient):
    create_note(client)

    response = client.get("/api/notes")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["page"] == 1
    assert data["page_size"] == 10
    assert data["items"][0]["title"] == "Transformer Attention"


def test_get_note_detail(client: TestClient):
    created = create_note(client).json()

    response = client.get(f"/api/notes/{created['id']}")

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == created["id"]
    assert data["original_content"] == created["original_content"]
    assert data["knowledge_points"][1]["content"] == "Attention score"


def test_update_note(client: TestClient):
    created = create_note(client).json()

    response = client.put(
        f"/api/notes/{created['id']}",
        json={
            "title": "Updated Note",
            "knowledge_points": ["Updated point"],
            "tags": ["AI"],
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Note"
    assert data["tags"] == ["AI"]
    assert [point["content"] for point in data["knowledge_points"]] == ["Updated point"]


def test_delete_note(client: TestClient):
    created = create_note(client).json()

    response = client.delete(f"/api/notes/{created['id']}")

    assert response.status_code == 200
    assert response.json() == {"message": "Note deleted successfully"}
    assert client.get(f"/api/notes/{created['id']}").status_code == 404


def test_search_notes(client: TestClient):
    create_note(client, title="Transformer Attention")
    create_note(
        client,
        title="SQLite Notes",
        original_content="Database basics",
        source="Claude",
        knowledge_points=["Foreign keys"],
        tags=["Database"],
    )

    response = client.get("/api/notes?q=Foreign")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["title"] == "SQLite Notes"


def test_filter_notes_by_tag(client: TestClient):
    create_note(client, title="Transformer Attention", tags=["AI", "Transformer"])
    create_note(client, title="SQLite Notes", tags=["Database"])

    response = client.get("/api/notes?tag=Database")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["title"] == "SQLite Notes"


def test_filter_notes_by_source(client: TestClient):
    create_note(client, title="ChatGPT Note", source="ChatGPT")
    create_note(client, title="Claude Note", source="Claude")

    response = client.get("/api/notes?source=Claude")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["title"] == "Claude Note"
