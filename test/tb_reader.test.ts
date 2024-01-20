import { FilenameAndContent, TextbaseReader } from "../src/tb_reader"
import {pipe, take} from 'iter-ops';

describe('textbase reader', () => {

    const tbr = new TextbaseReader('/home/petru/data/textbase-dl');

    it('files', async() => {
        const filesGen = pipe(tbr.files(), take(10));
        const arr = [...filesGen];
        
        expect(arr.length).toBe(10)
        arr.forEach(it => {
            expect(typeof(it)).toEqual('string')
            expect(it).toBeTruthy()
            expect(it.length).toBeGreaterThan(0)
        })        
    })

    it('chapters', async() => {
        const fGen = pipe(tbr.files(), take(10));
        const farr = [...fGen];

        const chGen = pipe(tbr.chapters(), take(10));
        const chArr = [...chGen];

        expect(chArr.length).toBe(10)
        expect(farr.length).toEqual(chArr.length)

        chArr.forEach(it => {
            const txt = it.content

            expect(it.path).toBeTruthy()
            expect(it.content).toBeTruthy()

            expect(it).toBeTruthy()
            expect(txt.length).toBeGreaterThan(0)
            expect(txt.trim()).toBeTruthy
        })
    })

    it('paragraphs', async() => {
        const n = 30
        const gen = pipe(tbr.paragraphs(), take(n));
        const paras = [...gen];

        expect(paras.length).toBe(n)

        paras.forEach(it => {

            expect(it.path).toBeTruthy()
            expect(it.location).toBeTruthy()
            expect(it.content).toBeTruthy()

            const txt = it.content            
            expect(txt.trim()).toBeTruthy
            expect(txt.length).toBeGreaterThan(0)
            
        })
    })


    it('sentences', async() => {
        const n = 30
        const gen = pipe(tbr.sentences(), take(n));
        const paras = [...gen];

        expect(paras.length).toBe(n)

        paras.forEach(it => {

            expect(it.path).toBeTruthy()
            expect(it.location).toBeTruthy()
            expect(it.content).toBeTruthy()

            const txt = it.content            
            expect(txt.trim()).toBeTruthy
            expect(txt.length).toBeGreaterThan(0)
            // p(`[${txt}]`)  //
        })
    })

    function p(args: any) { console.log(args) }
})

