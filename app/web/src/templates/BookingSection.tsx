import { Background } from '@/background/Background';
import { BookingRequestForm } from '@/components/BookingRequestForm';
import { Section } from '@/layout/Section';

const BookingSection = () => (
  <div id="booking">
    <Background color="bg-cornsilk">
      <Section
        title="Request a booking"
        description=""
      >
        <div className="mx-auto max-w-xl">
          <BookingRequestForm />
        </div>
      </Section>
    </Background>
  </div>
);

export { BookingSection };
