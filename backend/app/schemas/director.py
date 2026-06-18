from pydantic import BaseModel, ConfigDict
from datetime import date
from typing import Optional


class DirectorBase(BaseModel):
    name: str
    nationality: Optional[str] = None
    birth_date: Optional[date] = None


class DirectorCreate(DirectorBase):
    pass


class DirectorUpdate(BaseModel):
    name: Optional[str] = None
    nationality: Optional[str] = None
    birth_date: Optional[date] = None


class DirectorRead(DirectorBase):
    id: int

    model_config = ConfigDict(from_attributes=True)