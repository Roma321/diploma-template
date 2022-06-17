import React from 'react';
import Aside from './Aside';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

function App() {
 const [selectedPlaylist, setSelectedPlaylist]=React.useState("c8bc9ad3-1df2-4c9b-9cf7-cf6fc60441dc")
 const updateData = (value: string) => {
  setSelectedPlaylist(value)
}
 return (
 <div className="app">
   <Header/>
   <Aside updateData={updateData}/>
   <Main selected={selectedPlaylist}/>
   <Footer/>
  </div>
  );
 }
 export default App;
 