import fs from 'fs';
import path from 'path'


export class FilenameAndContent {
    constructor(public path: string,
        public location: string,
        public content: string) {}
}
    
export class TextbaseReader {

    constructor(protected basepath: string) { }


    files() {
        return this.rec_readFiles(this.basepath)
    }

    *chapters() {
        for (const f of this.files()) {
            const txt : string = fs.readFileSync(f, { encoding: 'utf-8'});
            if (txt.trim()) { // no empty chapters
                yield new FilenameAndContent(f, null, txt);
            }
        }
    }

    *paragraphs() {
        for (const ch of this.chapters()) {
            const txt = ch.content.trim()
            const paras = txt.split('\n')

            let i = 0
            for (const p  of paras) {
                const trimmed = p.trim()
                if (trimmed) {
                    const resp = new FilenameAndContent(ch.path, `${i}`, trimmed)
                    yield resp;
                    i += 1;
                }
            }
        }
    }

    *sentences() {
        for (const ch of this.paragraphs()) {
            const txt = ch.content.trim();
            const sentences = txt.split('.');

            let i = 0
            for (const sent  of sentences) {
                const trimmed = sent.trim();
                if (trimmed) {
                    const withFinalDot = trimmed + '.';
                    const resp = new FilenameAndContent(ch.path, `${i}`, withFinalDot)
                    yield resp;
                    i += 1;
                }
            }
        }
    }


    protected *rec_readFiles(dir: string): Generator<string> {
        const files = fs.readdirSync(dir, { withFileTypes: true });

        for (const file of files) {
            if (file.isDirectory()) {
                yield* this.rec_readFiles(path.join(dir, file.name));
            } else {
                yield path.join(dir, file.name);
            }
        }
    }

    // *take(iterable: Iterable, length: number) {
    //     const iterator = iterable[Symbol.iterator]();
    //     while (length-- > 0) yield iterator.next().value;
    //   }

}

// const tr = new TextbaseReader('/home/petru/data/textbase-dl');
// for (const f of tr.files()) {
//     console.log(f);

// }