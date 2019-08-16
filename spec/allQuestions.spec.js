// jest.mock('axios', () => ({
//     get: jest.fn()
//   }))
import Vue from 'vue'
import MyComponent from '../src/assets/js/components/allQuestions.vue'
//import axios from 'axios'

describe('MyComponent', () => {
    test('has a created hook', () => {
        expect(typeof MyComponent.created).toBe('function');
    })
    
    test('is correct default questions-data', () => {
        const defaultData = MyComponent.data();
        expect(Array.isArray(defaultData.questions)).toBe(true);
    })

    test('is correct default originalQuestions-data', () => {
        const defaultData = MyComponent.data();
        expect(Array.isArray(defaultData.originalQuestions)).toBe(true);
    })
}) 