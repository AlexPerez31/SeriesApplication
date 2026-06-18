from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.schemas.director import DirectorCreate, DirectorUpdate, DirectorRead
from app.models.director import Director

router = APIRouter()


@router.post("/", response_model=DirectorRead)
def create_director(director: DirectorCreate, db: Session = Depends(get_db)):
    new_director = Director(**director.model_dump())
    db.add(new_director)
    db.commit()
    db.refresh(new_director)
    return new_director


@router.get("/", response_model=list[DirectorRead])
def get_directors(db: Session = Depends(get_db)):
    return db.query(Director).all()


@router.get("/{director_id}", response_model=DirectorRead)
def get_director(director_id: int, db: Session = Depends(get_db)):
    director = db.query(Director).filter(Director.id == director_id).first()

    if not director:
        raise HTTPException(status_code=404, detail="Director not found")

    return director


@router.put("/{director_id}", response_model=DirectorRead)
def update_director(director_id: int, updated_data: DirectorUpdate, db: Session = Depends(get_db)):
    director = db.query(Director).filter(Director.id == director_id).first()

    if not director:
        raise HTTPException(status_code=404, detail="Director not found")

    for key, value in updated_data.model_dump(exclude_unset=True).items():
        setattr(director, key, value)

    db.commit()
    db.refresh(director)
    return director


@router.delete("/{director_id}")
def delete_director(director_id: int, db: Session = Depends(get_db)):
    director = db.query(Director).filter(Director.id == director_id).first()

    if not director:
        raise HTTPException(status_code=404, detail="Director not found")

    db.delete(director)
    db.commit()

    return {"message": "Director deleted successfully"}