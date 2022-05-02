import React,{useEffect, useState} from 'react';
import './Izmena.css'

const Izmena = ({editSpisak,editMode,toggleEditMode}) => {

  const[id, setId] = useState('');
  const[namirnica, setNamirnica] = useState('');
  const[kolicina, setKolicina] = useState('');

  useEffect(()=>{
    setId(editMode.id);
    setNamirnica(editMode.namirnica);
    setKolicina(editMode.kolicina);
  }, [editMode])


  const formSubmit=(event)=>{
    event.preventDefault();

    let namirnice = {
      id: editMode.id,
      namirnica: namirnica,
      kolicina:kolicina
    }

    editSpisak(namirnice);
  }

  const promeniId = (event) =>{
    setId(event.target.value);
  }

  const promeniNamirnicu = (event) =>{
    setNamirnica(event.target.value);
  }

  const promeniKolicinu = (event) =>{
    setKolicina(event.target.value);
  }

  return (
    <>

    <div className='klasaSpisak1'>
        <h1>Izmeni</h1>
        <form onSubmit={formSubmit}>
            <label htmlFor='idx'>Id: </label>
            <input type='text' name='idx' id='idx' disabled value={id}></input>
            <br></br>
            <label htmlFor='namirnica'>Namirnica: </label>
            <input type='text' name='namirnica' id='namirnica' onChange={promeniNamirnicu} value={namirnica}></input>
            <br></br>
            <label htmlFor='kolicina'>Kolicina: </label>
            <input type='text' name='kolicina' id='kolicina' onChange={promeniKolicinu} value={kolicina}></input>
            <br></br>
            <input type="submit" value="Izmeni"></input>
        </form>

        <button onClick={() => toggleEditMode(-1)} className='dugmeX'>x</button>
    </div>
    
    </>
  )
}

export default Izmena;