from sqlalchemy import Table, Column, Integer, ForeignKey
from app.db.database import Base

series_directors = Table(
    "series_directors",
    Base.metadata,
    Column("series_id", Integer, ForeignKey("series.id"), primary_key=True),
    Column("director_id", Integer, ForeignKey("directors.id"), primary_key=True),
)