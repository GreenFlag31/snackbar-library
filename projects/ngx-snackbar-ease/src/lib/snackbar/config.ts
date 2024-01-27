import { Subject } from 'rxjs';

export interface Config {
  maximum?: number;
  closeOnNavigation?: boolean;
}

export interface SubjectID {
  subject: Subject<any>;
}
