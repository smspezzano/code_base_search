SuffixTree = (function() {
  function SuffixTree() {
  }

  Object.defineProperty(SuffixTree, "delimiter", {
    // the property created here is used in server.js
    // it's used for delimiting lines of input
    get: function delimiter() {
      return SuffixTree.__delimiter || "$";
    },
    set: function delimiter(d) {
      SuffixTree.__delimiter = d;
    }
  });

  Object.defineProperty(SuffixTree, "filename", {
    // the property created here is used in server.js
    // it's used for keeping track of the filename on which
    // we are operating. it creates and intializes a hash
    // which you may use to set filenames on the leaves
    // once you get to that point
    get: function filename() {
      return SuffixTree.__filename || "";
    },
    set: function filename(f) {
      SuffixTree.__filename = f;
      SuffixTree.__delimiter_filename_hash = SuffixTree.__delimiter_filename_hash || {};
      SuffixTree.__delimiter_filename_hash[SuffixTree.__delimiter] = f;
    }
  });

  Object.defineProperty(SuffixTree, "delimiter_filename_hash", {
    get: function delimiter_filename_hash() {
      return SuffixTree.__delimiter_filename_hash || {};
    }
  });

  // use this to return the suffixes of a given node
  // this is a utility function, that omits other functions
  // because we are using the keys of the js object as suffix identifiers
  SuffixTree.prototype.suffixes = function() {
    return _.keys(
      _.omit(
        this,
        ['discovered','suffixes','search','leaves','learn','add','is_leaf']
      )
    );
  };

  // this utility function is going to return true
  // when the current node has no suffixes
  SuffixTree.prototype.is_leaf = function() {
    return this.suffixes().length === 0;
  };

  // Match p on a path starting from root
  //  3 cases:
  //  a. query does not match: query does not occur in T
  //  b. query ends in a node of the tree. 
  //    all leaves below node are occurrences of query
  //  c. query ends in an edge of the tree
  //    all leaves below node pointed to by edge are occurrences of query
  //
  //  an edge is a key of the node
  SuffixTree.prototype.search = function(query) {
  };

  // Return the leaf nodes for the sub tree
  // on which this function is called
  // you should consider implementing a depth
  // first traversal to the leaf nodes
  SuffixTree.prototype.leaves = function(leaves) {
  };

  // This should be the entry point into the suffix
  // tree's learning abilities. This function is called
  // from server.js. Find where it's called in server.js.
  // Basically, in server.js, we are calling this function
  // for each line in an input file

  // However, this should work just as easily for a simple
  // word, like banana :)
  // the meat and potatoes are cooked by SuffixTree.prototype.add
  SuffixTree.prototype.learn = function(word) {
  // go over entered word and for each suffix call add
    // var word = word || "";
    var new_word = word + SuffixTree.delimiter;
    var i = new_word.length - 1;
    // iterate over the suffixes
    // iterate over allbesides suffix with $
    //this["$"] = new suffix
    for(i; i>=0; i--){
      // for each suffix add the suffix to 
      var suffix = new_word.slice(i);
      this.add(suffix);
    }

  };
  
// SuffixTree.prototype.add = function(suffix) {
//     all_suffixes = this.suffixes();
//     for (var suffTree in all_suffixes){
//       for (var index in suffix){
//         if (all_suffixes[suffTree][0]===(suffix.slice(index))){
//             ///call add again
//         } else {
//           this.suffix = new SuffixTree();
//         }
//       }
//     }
//   };

  // this is the meat and potatoes function that cooks this excellent meal
  SuffixTree.prototype.add = function(suffix) {
    all_suffixes = this.suffixes();

    // does this suffix exist in the current node
    // if suffix[0] is === one of the keys[0]
    // then do   
    // else do this[suffix] = new SuffixTree

    //want to determine how far into the string there is a match

    //things that are matched, deleted key
      //then have node dangling in space
      //var old_node = this
      //create a new suffix with remainder
      // left branch with remainder
      // right branch with key of old_node
      // anytime i break a connection the remainder becomes a left node
      // other operations on the right
      // make na$ right node

    // we have a match and need to check rest of string against rest of node
      //both branches
      //call add on the node that is matched by the left overs
      // add(nana$ on THAT node) NOT the root node
        //see if match exist deeper into string
        //finally split on matched string
        //
        // this.slice(-1) = new SuffixTree;
        //   all_suffixes[suffTree] = this.slice(-2);
        // } else (all_suffixes[suffTree]) {
        //     this.suffix = new SuffixTree();
    var slice_point;
    if (!this.is_leaf()) {                            
      for (var suffTree in all_suffixes){
        if (all_suffixes[suffTree][0] === suffix[0]){
          for (var i = 1; i < suffix.length; i++){
            if(all_suffixes[suffTree][i] === suffix[i]){
              slice_point = i+1;
            } else {
              break;
            }
          }
          var hit_node_right = all_suffixes[suffTree].slice(0, slice_point);
          hit_node_right = new SuffixTree();
          var hit_node_left = all_suffixes[suffTree].slice(slice_point);
          hit_node_left = new SuffixTree();
          var suff_node = suffix.slice(slice_point);
        }
      }
    }
    this[suffix] = new SuffixTree();

  };

  // this just returns the SuffixTree to the outside world for usage
  return SuffixTree;
})();

