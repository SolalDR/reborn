/**
 * @class An abstract class to implement event system https://gist.github.com/SolalDR/3d41b385ab863e996bfaf5344a09eea5
 * @abstract
 * @author SolalDR - solal.dussout-revel@hotmail.fr
 */
class Event {

  constructor() {
    this.events = {};
  }

  /**
   * Test if a function is registered in the event stack
   * @param {string} event
   * @param {function} callback
   * @return boolean
   */
   eventExist( event, callback ){
    var exist = false;
    if( this.events[ event ] ) {
      this.events[ event ].forEach(callback => {
        if( this.events[ event ] === callback ){
          exist = true;
        }
      })
    }
    return exist;
  }

  /**
   * Trigger all the callbacks registered in an event
   * @param {string} e The event name
   * @param {Object} args An object with params passed in argument of the callback
   */
   emit( event, args = {} ){
    var list = event instanceof Array ? event : [ event ];

    list.forEach(eventName => {
      if( this.events[ eventName ] ) {
        this.events[eventName].forEach(callback => {
          callback.call( this, args );
        });
      }
    })
  }

  /**
   *
   * @param {*} event
   * @param {*} callback
   */
  once( event, callback ){
    var onceCallback = (e)=>{
      callback.call(this, e);
      this.off(event, onceCallback);
    }
    this.on(event, onceCallback);

    return this;
  }

  onceAll( events, callback ){
    var queue = events.map( event => ({ name: event, ready: false }));
    var isReady = _ => queue.find(queueItem => !queueItem.ready ) ? false : true;
    events.forEach( (event, i) => {
      this.once(event, () => {
        queue[i].ready = true;
        if( isReady() ){
          callback.call(this);
        }
      })
    })
  }

  /**
   * Register a new callback for an event
   * @param {string} event
   * @param {function} callback
   */
   on( event, callback ){
    var list = event instanceof Array ? event : [ event ];
    list.forEach( event => {

      if( !this.events[ event ] ){
        this.events[ event ] = new Map();
      }

      if( this.events[ event ] && !this.eventExist( event, callback ) ) {
        this.events[ event ].set( Symbol(), callback );
      }
    })

    return this;
  }

  /**
   * Unregister a callback from an event
   * @param {*} event
   * @param {*} callback
   */
   off( event, callback ){
    if( this.events[ event ] ){
      this.events[ event ].forEach( (tmpCallback, i) => {
        if( tmpCallback === callback ){
          this.events[ event ].delete(i);
        }
      } )
    }

    return this;
  }
}

export default Event;