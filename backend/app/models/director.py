from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.models.series_director import series_directors


class Director(Base):
    __tablename__ = "directors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    nationality = Column(String)
    birth_date = Column(Date)

    series = relationship(
        "Series",
        secondary=series_directors,
        back_populates="directors"
    )