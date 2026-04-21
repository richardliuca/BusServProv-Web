import { Background } from '@/background/Background';
import { BookingRequestForm } from '@/components/BookingRequestForm';
import { Section } from '@/layout/Section';

const BookingSection = () => (
  <div id="booking">
    <Background color="bg-white">
      <Section
        title="Request a booking"
        description="Describe what you need. We start a Temporal workflow so your request is tracked end to end."
      >
        <div className="mx-auto max-w-xl">
          <BookingRequestForm />
        </div>
      </Section>
    </Background>
  </div>
);

export { BookingSection };
