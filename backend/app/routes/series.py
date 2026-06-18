from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.schemas.series import SeriesCreate, SeriesUpdate, SeriesRead
from app.models.series import Series
from app.models.director import Director

router = APIRouter()


@router.post("", response_model=SeriesRead)
def create_series(series: SeriesCreate, db: Session = Depends(get_db)):
    directors = db.query(Director).filter(
        Director.id.in_(series.director_ids)
    ).all()

    new_series = Series(
        title=series.title,
        description=series.description,
        release_date=series.release_date,
        directors=directors
    )

    db.add(new_series)
    db.commit()
    db.refresh(new_series)
    return new_series


@router.get("", response_model=list[SeriesRead])
def get_series(db: Session = Depends(get_db)):
    return db.query(Series).all()


@router.get("/{series_id}", response_model=SeriesRead)
def get_series_by_id(series_id: int, db: Session = Depends(get_db)):
    series = db.query(Series).filter(Series.id == series_id).first()

    if not series:
        raise HTTPException(status_code=404, detail="Series not found")

    return series


@router.put("/{series_id}", response_model=SeriesRead)
def update_series(series_id: int, updated_data: SeriesUpdate, db: Session = Depends(get_db)):
    series = db.query(Series).filter(Series.id == series_id).first()

    if not series:
        raise HTTPException(status_code=404, detail="Series not found")

    series.title = updated_data.title or series.title
    series.description = updated_data.description or series.description
    series.release_date = updated_data.release_date or series.release_date

    if updated_data.director_ids is not None:
        directors = db.query(Director).filter(
            Director.id.in_(updated_data.director_ids)
        ).all()
        series.directors = directors

    db.commit()
    db.refresh(series)
    return series


@router.delete("/{series_id}")
def delete_series(series_id: int, db: Session = Depends(get_db)):
    series = db.query(Series).filter(Series.id == series_id).first()

    if not series:
        raise HTTPException(status_code=404, detail="Series not found")

    db.delete(series)
    db.commit()

    return {"message": "Series deleted successfully"}