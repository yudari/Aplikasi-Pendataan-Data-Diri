class Data {
    constructor(nim,nama, tanggal, no, alamat) {
        this.nim = nim;
        this.nama = nama;
        this.tanggal = tanggal;
        this.no = no;
        this.alamat = alamat;
    }
}

class Input {
    constructor(){

    }

    tampilData(data) {
       const row = document.createElement('tr');
       const td = document.getElementById('bodytableku');
      
       
       row.innerHTML = `
       <td>${data.nim}</td>
       <td>${data.nama}</td>
       <td>${data.tanggal}</td>
       <td>${data.no}</td>
       <td>${data.alamat}</td>
       <td><a href ='#' class = "hapus">X</a></td>
       `;

      td.appendChild(row);
      
       
        
    }
    hapusDaftar(hapus) {
        const pesan = new AnimasiInput();
        if(hapus.className === 'hapus') {
            hapus.parentElement.parentElement.remove();
            pesan.showPesan('Data Diri Telah Dihapus', 'alert-danger');
            setTimeout(() => {
                document.querySelector('.alert').remove();
            }, 2000);
        }
    }
    generateRandomNomor(){
        let min = 1000;
        let max = 9999;

        return Math.floor(Math.random() * (max - min)) + min;
    }
    hapusInput() {

    }
}

class AnimasiInput  {
    constructor() {}

    showPesan(message, alert) {
        const  pesan= document.createElement('div');
        pesan.className = `alert ${alert}`;
        pesan.appendChild(document.createTextNode(message));
        const form = document.getElementById('form-input');
        const dataPertama = form.firstElementChild;
        form.insertBefore(pesan,dataPertama);
    }
    selesaiInput() {
        const nim = document.getElementById('nim')
        const nama = document.getElementById('nama');
        const tanggal = document.getElementById('lahir');
        const noHp = document.getElementById('hp');
        const alamat = document.getElementById('alamat');

        nim.value = '';
        nama.value = '';
        tanggal.value = '';
        noHp.value = '';
        alamat.value = '';
    }
  
}

class LS {
    constructor(){}

    ambilData() {
        let data;
        
        if(localStorage.getItem('data') === null) {
            data = [];
        }else {
            data = JSON.parse(localStorage.getItem('data'));
        }
        return data;
    }
    tampilData() {
        const dataLS = new LS().ambilData();
        const input = new Input();
        dataLS.forEach(function(data) {
            input.tampilData(data);
        })
       
        
       
    }
    tambahData(dataDiri) {
        const data = new LS().ambilData();

        data.push(dataDiri);

        localStorage.setItem('data', JSON.stringify(data));
    }
    hapusData(data) {
        const dataLS = new LS().ambilData();
        dataLS.forEach(function(dataKu, index) {
            if(dataKu.nim === data) {
               dataLS.splice(index, 1);
            }
        })
        localStorage.setItem('data', JSON.stringify(dataLS));
    }


}

const formData = document.querySelector('#form-input');

formData.addEventListener('submit', function(e) {
    const nim = document.querySelector('#nim').value;
    const nama = document.querySelector('#nama').value;
    const tanggal = document.querySelector('#lahir').value;
    const noHp = document.querySelector('#hp').value;
    const alamat = document.querySelector('#alamat').value;
    
    const data = new Data(nim,nama, tanggal, noHp, alamat);

    const input = new Input();
   
  
    input.tampilData(data); 
    
    const animasi = new AnimasiInput();
    animasi.selesaiInput();
    animasi.showPesan('Data Telah Diinput', 'alert-success');
    setTimeout(function() {
        document.querySelector('.alert').remove();
    },2000)
    const ls = new LS();
    ls.tambahData(data);
    e.preventDefault();
})

const dataTable = document.querySelector('.data-ku');


//event Hapus Table
dataTable.addEventListener('click', function(e) {
    
    const input = new Input();
    input.hapusDaftar(e.target);
    
    const ls = new LS();
   
    ls.hapusData(e.target.parentElement.parentElement.firstElementChild.innerHTML);
})

document.addEventListener('DOMContentLoaded', function() {
    const ls = new LS();
    ls.tampilData();
   
    
})






