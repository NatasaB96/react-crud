import React from 'react';
import './AddNew.css';

const AddNew = ({items, add}) => {

let trenutniSpisak = items;
let idx;

const proveraSpiska = ()=>{
    console.log(trenutniSpisak.length)
    if(trenutniSpisak.length === 0){
        idx = 1;
        return idx;
    }
    idx = trenutniSpisak[trenutniSpisak.length - 1].id;
    return Number(idx) + 1;
}


const formSubmit = (event) =>{
    event.preventDefault();

    let dodavanjeNamirnice = {
        id: Number(event.target.idx.value),
        namirnica: event.target.namirnica.value,
        kolicina: event.target.kolicina.value
    }

    add(dodavanjeNamirnice);

    event.target.namirnica.value = '';
    event.target.kolicina.value = '';

    event.target.namirnica.focus();
}


  return (
    <div className='klasaSpisak1'>
        <h1>Dodaj novu namirnicu</h1>
        <form onSubmit={formSubmit}>
            <label htmlFor='idx'>Id: </label>
            <input type='text' name='idx' id='idx' disabled value={proveraSpiska()}></input>
            <br></br>
            <label htmlFor='namirnica'>Namirnica: </label>
            <input type='text' name='namirnica' id='namirnica'></input>
            <br></br>
            <label htmlFor='kolicina'>Količina: </label>
            <input type='text' name='kolicina' id='kolicina'></input>
                
            <br></br>
            <input type="submit" value="Dodaj"></input>
        </form>
    </div>
  )
}

export default AddNew;