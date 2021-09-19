import { environment } from './../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ReceiverService } from './../../services/receiver.service';
import { Receiver } from '../../models/receiver/receiver';
import { Component, OnInit } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Staff } from 'src/app/models/staff/staff';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {
  receivers: Receiver[] = [];
  receivers2: Receiver[] = [];
  staff:Staff[]
  staff2:Staff
  staffs:Staff[]=[]
  dataLoaded = false;
  filterText1="";
  filterText2="";
  filterText3="";
  totalRecords:number;
  page:number=1;

  constructor(private receiverService:ReceiverService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private staffService:StaffService,
    ) {}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if(params["nameSurname"]){
          this.getReceiversByNameSurname(params["nameSurname"])
        }else{
          this.getReceivers()
        }
      })
      this.activatedRoute.params.subscribe(params=>{
        if(params["cardNumber"]){
          this.getReceiversByCardNumber(params["cardNumber"])
        }else{
          this.getReceivers()
        }
      })
      this.activatedRoute.params.subscribe(params=>{
        if(params["clothe"]){
          this.getReceiversByClothe(params["clothe"])
        }else{
          this.getReceivers()
        }
      })
  }

  getReceivers() {
    this.receiverService.getReceivers().subscribe(response=>{
      this.receivers = response.data;
      this.totalRecords=response.data.length
      this.dataLoaded = true;
    })
  }

  getStaffs() {
    this.staffService.getStaffs().subscribe(response=>{
      this.staffs = response.data;
      this.totalRecords=response.data.length
      this.dataLoaded = true;
    })   
  }

  getReceiversByNameSurname(nameSurname:string) {
    this.receiverService.getReceiversByNameSurname(nameSurname).subscribe(response=>{
      this.receivers = response.data;
      this.dataLoaded = true;
    })
  }

  getReceiversByCardNumber(cardNumber:string) {
    this.receiverService.getReceiversByCardNumber(cardNumber).subscribe(response=>{
      this.receivers = response.data;
      this.dataLoaded = true;
    })
  }

  getReceiversByClothe(clothe:string) {
    this.receiverService.getReceiversByClothe(clothe).subscribe(response=>{
      this.receivers = response.data;
      this.dataLoaded = true;
    })
  }

  deleteReceiver(receiver: Receiver){
    let id=receiver.id;
    this.staffService.getById(id).subscribe(response => {
      this.staff =  response.data as Staff[];
      console.log(this.staff)
      if(response.data){
        let asd = JSON.stringify(this.staff);
        console.log('aa: '+asd);
        let asd2 = JSON.parse(asd);
        console.log(asd2.isAdded);
        asd2.isAdded=0;
           console.log(this.staff)
        this.staffService.update(asd2).subscribe(response=>{
        });
      }
    });
    this.toastrService.success("Kıyafet teslim alındı.",receiver.nameSurname)
    this.receiverService.delete(receiver).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
    });
    window.location.reload();
  }

  generateExcel() {

   
    //Excel Title, Header, Data
    const title = 'Kıyafet Verilenler';
    const header = ["Id", "Sicil No", "Ad Soyad", "Kart No", "Bölüm", "Departman ", "Kıyafet Tipi", "Veriliş Zamanı"]

    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Car Data');
    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    //Blank Row
    worksheet.addRow([]);

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Sicil No', key: 'sNo', width: 30 },
      { header: 'Ad Soyad', key: 'aSoyad', width: 30 },
      { header: 'Kart No', key: 'kNo', width: 30 },
      { header: 'Bölüm', key: 'bölüm', width: 30 },
      { header: 'Departman', key: 'departman', width: 30 },
      { header: 'Kıyafet Tipi', key: 'kTipi', width: 30 },
      { header: 'Veriliş Zamanı', key: 'vZaman', width: 30 },
    ]; 

    this.receiverService.getReceivers().subscribe(response=>{
      this.receivers2 = response.data;

      for (const receiver of this.receivers2) {
        worksheet.addRow({ id: receiver.id, sNo: receiver.employeeNumber,  aSoyad:receiver.nameSurname, kNo:receiver.cardNumber, bölüm:receiver.division, departman:receiver.department, kTipi:receiver.clothe, vZaman:receiver.time})
      }

    worksheet.addRow([]);
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'KıyafetData.xlsx');
    })
  })
  }
}
