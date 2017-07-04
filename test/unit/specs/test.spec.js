import Vue from 'vue';
import Index from '@/routes/index';

Vue.config.productionTip = false;

describe('Index.vue', function () {
  // Inspect the raw component options
  it('has a created hook', () => {
    expect(typeof Index.created).toBe('undefined')
  })

  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof Index.data).toBe('function')
    const defaultData = Index.data()
    expect(defaultData.msg2).toBe('test')
  })
});