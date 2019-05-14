# Entities model

Here are defined all the different entities model behaviours. 
Below the squeleton of one of these

```javascript

var modelDescriptor = {
  name: String,
  slug: String, //[optionnal]
  size: {
    x: Number,
    y: Number
  },
  states: {
    // State when a entity is created
    creation: {
      duration: Number    // Duration on the state in milisecond
      enterModifiers: [
        {
          name: String,   // Metric name
          value: Number   // Operation on it when enter the state
        },
        {
          name: 'money',
          value: -100,
          checkBefore: true // Check if the metric money reach its limit with this modifier
        }
      ],
      recurModifiers: [
        {
          name: String,   // Metric name
          value: Number   // Operation on each tick
        }
      ],
      leaveModifiers: [
        {
          name: String,   // Metric name
          value: Number   // Operation on it when living the state
        }
      ]
    },

    mounted: {
      //...
    },

    destruction: {
      //...
    },

    living: {
      //...
    }
  }
}

```

