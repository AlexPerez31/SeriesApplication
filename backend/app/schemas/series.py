from pydantic import BaseModel, ConfigDict
from datetime import date
from typing import Optional, List


class SeriesBase(BaseModel):
    title: str
    description: Optional[str] = None
    release_date: Optional[date] = None


class SeriesCreate(SeriesBase):
    director_ids: List[int] = []


class SeriesUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    release_date: Optional[date] = None
    director_ids: Optional[List[int]] = None


class DirectorOut(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class SeriesRead(SeriesBase):
    id: int
    directors: List[DirectorOut] = []

    model_config = ConfigDict(from_attributes=True)