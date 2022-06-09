import Solflare from '@/assets/common/solflare.svg';
import Phantom from '@/assets/common/phantom.png';

const walletList: {
  name: string;
  icon: string;
  website: string;
  walletType: number;
}[] = [
  {
    name: 'Phantom',
    icon: Phantom,
    website: 'https://phantom.app/',
    walletType: 1,
  },
  {
    name: 'Solflare',
    icon: Solflare,
    website: '',
    walletType: 2,
  },
];

export default walletList;
