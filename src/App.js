import { useState,useEffect } from "react";
import Tabela from "./components/Tabela/Tabela";
import AddNew from "./components/AddNew/AddNew";
import Izmena from "./components/Izmena/Izmena";

const App = ()=> {

  const[editMode, setEditMode] = useState({
    mode:false,
    id: '',
    namirnica:'',
    kolicina: null
  })

  const[spisak, setSpisak] =useState([
    // {id:1,
    // namirnica:'jabuka',
    // kolicina:4
    // },
    // {id:2,
    // namirnica:'sos',
    // kolicina:2
    // }
  ]);

  const[korpa, setKorpa] = useState([])

  if(!localStorage.getItem('korpa')){
    localStorage.setItem('korpa', '[]');
  }

  useEffect(()=>{
    setKorpa(JSON.parse(localStorage.getItem('korpa')));
    setSpisak(JSON.parse(localStorage.getItem('korpa')));
  },[])

  useEffect(()=>{setKorpa([...spisak])},[spisak])

  useEffect(()=>{
    localStorage.setItem('korpa', JSON.stringify(korpa));
  })

  const addNamirnicu = (addItem) =>{
    let novaNamirnica = {
      id: addItem.id,
      namirnica: addItem.namirnica,
      kolicina: addItem.kolicina
    }
    setSpisak((prev => [...prev, novaNamirnica]));
  }

  const obrisiNamirnicu = (id) =>{
    let brisanjeNamirnica = [...spisak];
    brisanjeNamirnica.forEach((element,idx) =>{
      if(element.id === id){
        brisanjeNamirnica.splice(idx,1)
      }
      setSpisak(brisanjeNamirnica);
      setKorpa(brisanjeNamirnica);
    });
  }


  const toggleEditMode = (id) =>{

    if(id === -1){
      setEditMode({mode: false, id: '', ime: '', prezime:'', god: null});
      return;
    } 

    let namirniceEdit = spisak.filter(itemEdit => itemEdit.id === id);
  
    setEditMode({
      mode:true,
      id:id,
      namirnica: namirniceEdit[0].namirnica,
      kolicina: namirniceEdit[0].kolicina
    });

  }

  const editSpisak = (editItem) =>{
    let spisakEdit = [...spisak];
    
    spisakEdit.forEach((i,ind)=>{
      if(editItem.id === i.id){
        spisakEdit[ind].namirnica = editItem.namirnica;
        spisakEdit[ind].kolicina = editItem.kolicina;
      }
    });

    setSpisak(spisakEdit);

    setEditMode({mode:false, namirnica: '', kolicina:''});
  }
  

  return (
    <>

    {editMode.mode === false ? <AddNew items ={spisak} add = {addNamirnicu}></AddNew> : <Izmena editSpisak={editSpisak} editMode={editMode} toggleEditMode={toggleEditMode}></Izmena> }
  

    <Tabela data = {korpa}  remove ={obrisiNamirnicu} toggleEditMode={toggleEditMode} dataLimit={8}></Tabela>

    </>
    
    
  );
}

export default App;
