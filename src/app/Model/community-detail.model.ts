export class TableData {
  id: number = 0;
  noOfVistorParkingLot: number = 0;
  amount: number = 0;
  status: string = '';
  chargeType: string = '';
}

export class CommunityModel {
  id: number = 0;
  state: number = 0;
  communityId: string = '';
  communityName: string = '';
  city: string = '';
  address: string = '';
  noOfUnits: number = 0;
  picName: string = '';
  communityType: string = '';
  picEmail: string = '';
  noOfParkingLot: number = 0;
  gracePeriod:number=0;
  feesMonthly:number=0;
  picPhoneNo:string='';
  noOfResidentPackingLot:number=0;
  tableRows: TableData[] = [];
}