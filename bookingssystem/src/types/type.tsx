export type Slot = {
  id: number;
  date: string;
  time: string;
  room_id: number;
  booked: boolean;
  booked_by: string | null;
};
export type Room = {
  id: number;
  name: string;
  capacity: number;
};
