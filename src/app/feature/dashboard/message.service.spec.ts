import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { Survey } from './create-survey/data.models';

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  it('should data present', () => {
    const data = new Survey(1, null, null, null, null, null, null);
    const service: MessageService = TestBed.get(MessageService);
    service.sendSurveyData(data);
    expect(service.getSurveyData().ID).toEqual(data.ID);
  });
});
