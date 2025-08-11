import instagram from './instagram';
import telegram from './telegram';
import { Channel } from './types/Types';

export default {
  telegram,
  instagram,
} as Record<string, Channel>;