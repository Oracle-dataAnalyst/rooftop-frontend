from typing import Generator


def get_db_session() -> Generator[None, None, None]:
    yield None
