export interface Community {
  id: number;
  stateId: number;
  communityId: string;
  communityName: string;
  cityName: string;
  address: string | null;
  noOfUnits: number;
  picName: string | null;
  picMobile: string | null;
  picEmail: string | null;
  noOfParkingLot: number;
}

export interface CommunityResponse {
  communityResult: Community[];
}