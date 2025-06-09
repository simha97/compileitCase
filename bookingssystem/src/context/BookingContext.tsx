import { createContext, useContext, useState, ReactNode } from "react";

type BookingContextType = {
  selectedSlotId: number | null;
  setSelectedSlotId: (id: number) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  return (
    <BookingContext.Provider value={{ selectedSlotId, setSelectedSlotId }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
};
