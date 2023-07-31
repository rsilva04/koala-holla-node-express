let koalaList = [];

function getKoalas() {
  console.log('in getKoalas');
  // axios call to server to get koalas
  axios.get('/koalas/koalasList').then((response) => {
    koalaList = response.data;
    console.log('KoalaList Get', koalaList)
    viewKoalas.innerHTML = '';
    for (let i in koalaList) {
      if (koalaList[i].readyToTransfer === false || koalaList[i].readyToTransfer === 'false') {
        viewKoalas.innerHTML += `
        <tr>
      <td>${koalaList[i].koalaName}</td>
      <td>${koalaList[i].age}</td>
      <td>${koalaList[i].sex}</td>
      <td><button onclick="setTransfer(${i})">No</button></td>  
      <td>${koalaList[i].notes}</td>
      <td><button onclick="deleteKoala(${i})">X</td>
      </tr>  
      `
      }
      else if(koalaList[i].readyToTransfer || koalaList[i].readyToTransfer === 'true') {
        viewKoalas.innerHTML += `
      <tr>
      <td>${koalaList[i].koalaName}</td>
      <td>${koalaList[i].age}</td>
      <td>${koalaList[i].sex}</td>
      <td>Yes</td>
      <td>${koalaList[i].notes}</td>
      <td><button onclick="deleteKoala(${i})">X</td>
      `
      }

    }
  }).catch((error) => {
    console.log(error);
    alert('Something went wrong.');
  });
}// end getKoalas

function deleteKoala(index) {
  axios.delete(`/koalas/koalas/${index}`).then((response) => {
    console.log(response);
    getKoalas();
  })
}


function setTransfer(index) {
  axios.put(`/koalas/transfer/${index}`).then((response) => {
    console.log(response);
    getKoalas();
  });
  }


function saveKoala() {
  console.log('in saveKoala');
  // axios call to server to get koalas

}

// id="ageIn"
// id="sexIn"
// id="readyForTransferIn"
// id="notesIn"

//         this.koalaName = koalaName;
//         this.sex = sex;
//         this.age = age;
//         this.readyToTransfer = transfer;
//         this.notes = notes;


function addNewKoala(event) {
  event.preventDefault();
  let koalaName = document.querySelector('#nameIn').value
  let age = document.querySelector('#ageIn').value
  let sex = document.querySelector('#sexIn').value
  let readyToTransfer = document.querySelector('#readyForTransferIn').value
  let notes = document.querySelector('#notesIn').value
  console.log(readyToTransfer);
  let newKoalaAdded = {
    koalaName: koalaName,
    age: age,
    sex: sex,
    readyToTransfer: readyToTransfer,
    notes: notes
  }
  console.log(newKoalaAdded);

  axios.post('/koalas/koalas', newKoalaAdded).then((response) => {
    console.log(response);
    koalaName = ''
    age = ''
    sex = ''
    notes = ''

    getKoalas()
  }).catch((error) => {
    console.log(error);
    alert('Something Went Wrong')
  })


}

getKoalas();

//Data for testing only
nameIn.value = 'Bumblebee';
ageIn.value = 6;
notesIn.value = "Likes honey, bites mean people"