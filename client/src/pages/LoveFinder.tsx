import { FC } from 'react'
import Feed from '../components/Feed';
import Couples from '../components/Couples';
import Header from '../components/Header';

const LoveFinder: FC = () => {

  return (
    <div className='min-h-screen bg-lime-100 flex flex-col items-center py-16 gap-8'>
      <Header/>
      <Couples/>
      <Feed />
    </div>
  )
}

export default LoveFinder