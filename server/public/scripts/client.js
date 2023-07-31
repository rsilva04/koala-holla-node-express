let koalaList = []

  function getKoalas() {
    console.log( 'in getKoalas' );
    // axios call to server to get koalas
    axios.get('/koalas/koalasList').then((response) => {
      koalaList = response.data;
      for (let i in koalaList) {
        viewKoalas.innerHTML += `
        <tr>
        <td>${koalaList[i].koalaName}</td>
        <td>${koalaList[i].sex}</td>
        <td>${koalaList[i].age}</td>
        <td>${koalaList[i].readyToTransfer}</td>
        <td>${koalaList[i].notes}</td>
        </tr>
        `;
      }
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
  }); 
    }// end getKoalas

function saveKoala(){
  console.log( 'in saveKoala' );
  // axios call to server to get koalas
 
}

function addNewKoala(event){
event.preventDefault()
let name = document.querySelector('#nameIn').value
let age = document.querySelector('#ageIn').value
let sex = document.querySelector('#sexIn').value
let readyToTransfer = document.querySelector('#readyForTransferIn').value
let notes = document.querySelector('#notesIn').value
let newKoalaAdded = {
  name: koalaName,
  age: age, 
  sex: sex,
  readyToTransfer: Transfer,
  notes: notes, 
}
console.log(newKoalaAdded);
}
axios.post('/koalas/koalas' , newKoalaAdded).then((response) => {
  console.log(response);
  age = ''
  sex = ''
  notes = ''
  getKoalas();
}).catch((error) => {
  console.log(error);
  alert('somethins went wrong')
});
