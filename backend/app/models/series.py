from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.models.series_director import series_directors


class Series(Base):
    __tablename__ = "series"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    release_date = Column(Date)

    directors = relationship(
        "Director",
        secondary=series_directors,
        back_populates="series"
    )