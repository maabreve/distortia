export class SongsModel {
    constructor(
        public title: string,
        public artist: string,
        public style: string,
        public iplay: boolean,
        public wannaplay: boolean,
        public _id?: string,
    ) { }
}
