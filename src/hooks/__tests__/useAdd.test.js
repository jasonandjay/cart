// 业务代码
import { renderHook, act } from '@testing-library/react-hooks'
import useAdd from '../useAdd'

// 测试代码
describe('useAdd tests', ()=>{
   it('should be defined', () => {
        expect(useAdd).toBeDefined();
    });
   it('should increment counter', () => {
    const { result } = renderHook(() => useAdd());
    act(() => {
        result.current.action.changeCount()
    })

    expect(result.current.count).toBe(1)
   })
})