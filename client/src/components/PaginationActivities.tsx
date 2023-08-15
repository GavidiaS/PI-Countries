import style from '../modules/pagination.module.css';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from '../store';
import { decrement, handlePage, increment } from '../store/context/activitySlice';

export default function PaginationActivities() {
  const { page, activities } = useAppSelector(state => state.activity);
  const dispatch = useAppDispatch();
  const totalPage = Math.ceil(activities.length / 10);
  const listPage = [];
  for (let i = 1; i <= totalPage; i++) {
    listPage.push(i);
  }
  function next() {
    dispatch(increment());
  }
  function prev() {
    dispatch(decrement());
  }
  function numPage(n: number) {
    dispatch(handlePage(n));
  }
  return (
    <>
      <button className={style.prev} onClick={prev} disabled={page > 1 ? false : true}><FontAwesomeIcon icon={faChevronLeft} /></button>
      <h2 className={style.page}>{page}</h2>
      <button className={style.next} onClick={next} disabled={page < totalPage ? false : true}><FontAwesomeIcon icon={faChevronRight} /></button>
      <div className={style.list}>
        {
          listPage?.map(page => {
            return <button key={page} onClick={() => numPage(page)}>{page}</button>
          })
        }
      </div>
    </>
  );
}