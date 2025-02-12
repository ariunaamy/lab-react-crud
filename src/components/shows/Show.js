import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getOneShow, destroyShow} from "../../api/fetch.js"
import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";


function Show() {
  
  const [show, setShow] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams(); // useparams gives us an access to the parameters we set in our paths in our routing 
  const navigate = useNavigate();

  useEffect(()=>{
    getOneShow(id).then(res =>{
      setShow(res)
      if(res.id){
        setLoadingError(false)
      }
      }).catch((error) => {
      console.log(error)
      setLoadingError(true);
    })
   }, [id]);

  function handleDelete(id) {
    destroyShow(id).then(()=>{
      navigate("/shows")
    }).catch(error =>{
      loadingError(true)
    })
  }

  return (
    <section className="shows-show-wrapper">
      <h2>{show.title}</h2>
      <section className="shows-show">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {show.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {show.listedIn}
              </p>
              <p>
                <span>Country:</span> {show.country}
              </p>
              <p>
                <span>Rating:</span> {show.rating}
              </p>
              <p>
                <span>Date Added:</span> {show.dateAdded}
              </p>
            </aside>
            <article>
              <p>{show.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => handleDelete(show.id)}>
                Remove show
              </button>
              <Link to={`/shows/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Show;
