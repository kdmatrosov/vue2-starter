import Vue from 'vue';
import Test from '@/components/Test.vue';

Vue.config.productionTip = false;

describe('Test.vue', function () {
  // Inspect the raw component options
  it('has a created hook', () => {
    expect(typeof Test.created).toBe('undefined')
  })

  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof Test.data).toBe('function')
    const defaultData = Test.data()
    expect(defaultData.msg).toBe('Welcome to Your Vue.js App!')
  })
  // Inspect the component instance on mount
  it('correctly sets the message when created', () => {
    const vm = new Vue(Test).$mount()
    expect(vm.msg).toBe('Welcome to Your Vue.js App!')
  })
  // Mount an instance and inspect the render output
  it('renders the correct message', () => {
    const Ctor = Vue.extend(Test)
    const vm = new Ctor().$mount()
    expect(vm.$el.textContent).toBe('Welcome to Your Vue.js App!')
  })
});