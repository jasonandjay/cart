// 描述测试文件
describe("test src/index.js", ()=>{
    // 描述测试分组
    describe('test equal', ()=>{
        // 描述的测试用例
        it('test toBe', ()=>{
            const someObject = {};  
            expect('123').toBe('123'); 
            expect('123').not.toBe('1234'); 
            expect(someObject).toBe(someObject); 
        })
        
        it('test toEqual', ()=>{
            const someObject = {a:1,b:2};
            expect(someObject).toEqual({a:1,b:2});
        })

        it('test stringContaining', ()=>{
            const someString = 'hello123 world'
            expect(someString).toEqual(expect.stringContaining(`ell`))
        })

     
        it('test throw error', ()=>{
            const error = new Error('');
            function throwError(){
                throw(error);
            }
            expect(
                throwError
            ).toThrow(error);
        })

        it('test toHaveProperty', ()=>{
            const someObject = {id:'123'};  
            expect(someObject).toHaveProperty('id'); 
            expect(someObject).not.toHaveProperty('ids'); 
        })

        it('test matchObject', ()=>{
            const someObject = {show(){},name:'xxx',address:'xxx北京yyy'};
            expect(someObject).toMatchObject({
                show: expect.any(Function),
                name:'xxx',
                address:expect.stringContaining('北京') 
            });
        })
    })

    describe('test async', ()=>{
        const mocks = {
            axios: {
              get: jest.fn()
            }
       };
       it('test reject', async ()=>{
            mocks.axios.get.mockRejectedValue('error');
            await expect(mocks.axios.get).rejects.toEqual('error');
       })
       it('test resolve', async ()=>{
            mocks.axios.get.mockResolvedValue('success');
            await expect(mocks.axios.get()).resolves.toEqual('success');
        })
        
        it('test reject throw error', async ()=>{
             // 异步抛出异常
            const error = new Error('error');
            mocks.axios.get.mockRejectedValueOnce(error);
            await expect(mocks.axios.get).rejects.toThrow(error);
        })
    })

    describe('test error', ()=>{
        const someFunction = ()=>{ throw new Error('xyz unkow error abcedfg')}
        it('test throw detail error', ()=>{
            expect(() => someFunction()).toThrow('xyz unkow error abcedfg');
        })
        
        it('test throw error', ()=>{
            expect(() => someFunction()).toThrow();
        })

        it('test throw error property', ()=>{
            expect(() => someFunction()).toThrow(
                expect.objectContaining({
                    message: expect.stringContaining('error')
                })
            );
        })

    })

    describe('test function', ()=>{
        function format(num) {
            return (num+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
        }
        it('test format function', ()=>{
            expect(format('123456')).toBe('123,456');
            expect(format('12')).toBe('12');
        })

        it('test function called', ()=>{
            const someFunction = jest.fn();
            expect(someFunction).not.toHaveBeenCalled();
            someFunction();
            expect(someFunction).toHaveBeenCalled();
        })

        it('test function called num & arguments', ()=>{
            const someFunction = jest.fn(()=>{});
            someFunction('a', 'c');
            someFunction('b', 'd');
            // jest 包装后的函数可以调出 mock.calls 属性，它是一个数组其长度代表被调用的次数
            // 数组每一个元素也是一个数组，值为该函数调用时数组化后 arguments 
            expect(someFunction.mock.calls.length).toBe(2);

            expect(someFunction.mock.calls[0][0]).toBe('a');
            expect(someFunction.mock.calls[1][1]).toBe('d');
        })

        it('test function arguments', ()=>{
            const someFunction=jest.fn(()=>{});
            someFunction('hello123','world');
            expect(someFunction).toHaveBeenCalledWith(
                expect.stringContaining(`ell`), 'world'
            );
        })
    })
})