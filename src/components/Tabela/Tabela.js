import React,{useState,useEffect} from 'react'
import  './Tabela.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Tabela = ({data,remove,toggleEditMode,dataLimit}) => {

    const[currentPage, setCurrentPage] = useState(1);
    const pages = Math.floor(data.length / dataLimit) + 1 ;

    const goToNextPage = () =>{
        setCurrentPage((page) => page + 1);
    }
  
    const goToPreviousPage = () =>{
        setCurrentPage((page) => page - 1);
    }
  
    const getPaginatedData = () =>{
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex,endIndex);
    }

    const izbrisatiSpisak = ()=>{
       data = [];
       localStorage.setItem('korpa', JSON.stringify(data));
       window.location.reload(false);
    }



  return (
   <div className='klasaSpisak'>
       
        <h1>Spisak <FontAwesomeIcon icon={faCartShopping} style={{fontSize:'22px', color:'#AA0110'}}/></h1>
       <table className='tabela'>
           <thead>
                <tr>
                    <th>Id</th>
                    <th>Namirnica</th>
                    <th>Količina</th>
                    <th>Izbrisi</th>
                    <th>Izmeni</th>
                </tr>
           </thead>
           <tbody>
               
                {getPaginatedData().map(item =>{
                    return(
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.namirnica}</td>
                            <td>{item.kolicina}</td>
                            <td><button className='izbrisi' onClick={()=>{remove(item.id)}}>x</button></td>
                            <td><button className='izmeni'onClick={()=>{toggleEditMode(item.id)}}>Izmeni</button></td>
                        </tr>
                    )
                })}
           </tbody>
       </table>
       <button onClick={izbrisatiSpisak} className='dugmeSpisak'>x</button>

       <div className='paginacija'>
            <button onClick={goToPreviousPage} className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>Prethodna</button>
            <input type="text" disabled value={`${currentPage} / ${pages}`} style={{textAlign:'center'}}></input>
            <button onClick={goToNextPage} className={`next ${currentPage === pages ? 'disabled' : ''}`}>Sledeca</button>
       </div>
       
   </div>

  )
}

export default Tabela;