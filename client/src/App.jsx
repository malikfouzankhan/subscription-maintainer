import FuzzyText from './components/FuzzyText';
import Antigravity from './components/Antigravity';

export default function App() {
  return (
    <div className='bg-black min-h-screen relative'>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover
        className='relative top-20'
      >
        Subscription
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover
        className='relative top-20 left-28'
      >
        Reminder
      </FuzzyText>
    </div>
  );
}
