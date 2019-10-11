export class Survey {
    constructor(
        public ID: number,
        public Type: string,
        public Title: string,
        public IsDeleted: boolean,
        public IsAnonymous?: boolean,
        public question?: Question[],
        public userId?: string
        ) {}
}

export class Question {
    constructor(
        public ID: number,
        public Type: string,
        public Text: string,
        public options: Option[],
        public Required: boolean,
        public Remarks: string,
        public hasRemarks: boolean,
        ) {}
}

export class Option {
    constructor(
        public ID: number,
        public OptionText: string,
        public OptionColor: string,
        public hasRemarks: boolean
    ) {}
}



