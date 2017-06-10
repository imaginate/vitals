# Compile Class & Syntax Specs
This guide describes every compile class, defines each member and method of every class, and provides descriptive details for the compile syntax within the source. It is likely that this compiler will become its own separate project in the future. Thoughts and feedback appreciated.

## GOTO
- [File System](#user-content-fs)
  - [Directories](#user-content-dir)
  - [Files](#user-content-file)
  - [Lines](#user-content-line)
- [Source Syntax](#user-content-syntax)
  - [Groups](#user-content-grps)
    - [Blocks](#user-content-blk)
    - [Conditionals](#user-content-cond)
    - [Macros](#user-content-def)
  - [References](#user-content-refs)
    - [Includes](#user-content-incl)
    - [Inserts](#user-content-ins)


<a name="fs"></a>
## File System
The file-system classes wrap different file-system components for the compiler.

### GOTO
- [Directories](#user-content-dir)
- [Files](#user-content-file)
- [Lines](#user-content-line)


<a name="dir"></a>
## Directory Class

 Constructor | Description
:------------|:------------
 `Dir`       | The `Dir` class wraps each directory node within the *src* tree.

<a name="dir-members"></a>
### Directory Members

 Member | Data Type          | Description
:------ |:----------         |:------------
 type   | *`!Object`*        | A pointer to a unique `object` instance designated for the `Dir` class.
 name   | *`string`*         | The `Dir` instance's directory name.
 tree   | *`string`*         | The `Dir` instance's directory path relative to the root `Dir` instance (`"./"` not included). A forward slash is appended to the end of every `Dir` instance tree except for the root `Dir` instance which has an empty tree.
 path   | *`string`*         | The `Dir` instance's absolute directory path.
 parent | *`?Dir`*           | A pointer to the `Dir` instance's parent `Dir` instance. It is `null` if it is the root `Dir` instance.
 dirs   | *`!Object<!Dir>`*  | A hash map of all of the child `Dir` instances within the `Dir` instance.
 files  | *`!Object<!File>`* | A hash map of all of the child `File` instances within the `Dir` instance.

<a name="dir-methods"></a>
### Directory Methods

 Method     | Description
:-------    |:------------
 load       | This method triggers the *load* method for all of the `Dir` instance's child `Dir` and `File` instances.
 preprocess | This method triggers the *preprocess* method for all of the `Dir` instance's child `Dir` and `File` instances.
 process    | This method triggers the *process* method for all of the `Dir` instance's child `Dir` and `File` instances.
 compile    | This method triggers the *compile* method for the designated `File` instance. It takes the following three parameters: a relative *src* file path `string` (RELATIVE TO THE ROOT `Dir` -- NO ABSOLUTE PATHS), an absolute or relative *dest* file path `string` (RELATIVE TO THE CWD), and an `object` of hashed `Cond` keys and `boolean` values.


<a name="file"></a>
## File Class

 Constructor | Description
:------------|:------------
 `File`      | The `File` class wraps each file node within the *src* tree.

<a name="file-members"></a>
### File Members

 Member  | Data Type                               | Description
:------- |:----------                              |:------------
 type    | *`!Object`*                             | A pointer to a unique `object` instance designated for the `File` class.
 name    | *`string`*                              | The `File` instance's file name.
 tree    | *`string`*                              | The `File` instance's file path relative to the root `Dir` instance (`"./"` not included).
 path    | *`string`*                              | The `File` instance's absolute file path.
 parent  | *`!Dir`*                                | A pointer to the `File` instance's parent `Dir` instance.
 lines   | *`!Array<!Line>`*                       | An ordered `array` of all of the `Line` instances within the `File` instance scope (i.e. each `Ins` modifies this property).
 defs    | *`!Object<!Def>`*                       | A hash map of all of the `Def` instances within the scope of the `File` instance. The *hashed* key names combine each `Def` tag and id using a colon as the separator (e.g. `"tag:id"`).
 blks    | *`!Object<!Blk>`*                       | A hash map of all of the `Blk` instances within the root scope of the `File` instance. The *hashed* key names combine each `Blk` tag and id using a colon as the separator (e.g. `"tag:id"`).
 conds   | *`!Object<!Cond>`*                      | A hash map of all of the `Cond` instances within the root scope of the `File` instance. The *hashed* key names combine each `Cond` tag and id using a colon as the separator (e.g. `"tag:id"`).
 incls   | *`!Object<!Incl>`*                      | A hash map of all of the `Incl` instances within the root scope of the `File` instance. The *hashed* key names combine each `Incl` tag and id using a colon as the separator (e.g. `"tag:id"`).
 inserts | *`!Array<!Ins>`*                        | An ordered `array` of all of the `Ins` instances within the `File` instance.
 content | *`!Array<(!Line\|!Blk\|!Cond\|!Incl)>`* | An ordered `array` of all of the `Line`, `Blk`, `Cond`, and `Incl` instances within the root scope of the `File` instance.

<a name="file-methods"></a>
### File Methods

 Method     | Description
:-------    |:------------
 load       | This method causes the `File` instance's *path* to be read, a new `Line` instance to be constructed and pushed to the `File` instance's *lines* `array` for each line within the `File`, a new `Def` instance to be constructed and defined in the `File` instance's *defs* `object` for each `Def` within the `File`, and each `Line` within the *lines* of each `Def` instance to be spliced from the `File` instance's *lines* `array`.
 preprocess | This method causes a new `Ins` instance to be constructed and pushed to the `File` instance's *inserts* `array` for each `Ins` within the `File`, each `Ins` instance's *line* `Line` to spliced from the `File` instance's *lines* `array`, and each `Line` from each `Ins` instance's *lines* `array` to be spliced to the `File` instance's *lines* `array`.
 process    | This method causes a new `Blk`, `Cond`, or `Incl` instance to be constructed and defined in the `File` instance's *blks*, *conds*, or *incls* `object` for each `Blk`, `Cond`, and `Incl` within the root scope of the `File` instance and the `File` instance's *content* `array` to be filled (in order of appearance) with each `Line`, `Blk`, `Cond`, and `Incl` within the root scope of the `File` instance.
 compile    | This method creates a compiled destination file (i.e. *dest*). It takes the following two parameters: an absolute or relative *dest* file path `string` (RELATIVE TO THE CWD) and an `object` of hashed `Cond` keys and `boolean` values. Note that all `Incl` loops are caught in this step.


<a name="line"></a>
## Line Class

 Constructor | Description
:------------|:------------
 `Line`      | The `Line` class wraps each line of text within every `File` instance.

<a name="line-members"></a>
### Line Members

 Member  | Data Type   | Description
:------- |:----------  |:------------
 type    | *`!Object`* | A pointer to a unique `object` instance designated for the `Line` class.
 file    | *`!File`*   | A pointer to the parent `File` instance of the `Line` instance.
 text    | *`string`*  | The `Line` instance's original UTF-8 encoded text. Note that all end-of-line characters (e.g. line-feeds and carriage-returns) are trimmed.
 linenum | *`number`*  | A positive `integer` (i.e. a whole `number` greater than `0`) representing the `Line` instance's original position within its *file* `File` instance's context. Note that the first *linenum* in a `File` is `1` (i.e. one-based).

<a name="line-methods"></a>
### Line Methods

 Method   | Description
:-------  |:------------
 *`void`* | The `Line` class has no methods.


<a name="syntax"></a>
## Source Syntax
The compile syntax has a simple layout and structure. It is built upon a single option, the *command*. A *command* is always one line. It is based upon one pattern with few variations to comprise the five total syntax *command* types available. The five *command* types are separated into two general types, [groups](#user-content-grps) and [references](#user-content-refs). The [group commands](#user-content-grps) create *scopes* of code (e.g. JavaScript) that can be enabled or disabled and be re-used. The [reference commands](#user-content-refs) reference [groups](#user-content-grps) of code from outside *scopes* (e.g. other [files](#user-content-file)) to give you more flexible composability with any programming language (although for now, it is only JavaScript, but that is easy to change). All of the *commands* consist of four basic syntax components, and both of the [reference](#user-content-refs) *command* types have an optional fifth.

### The 5 Commands
##### The Group Commands
1. <p><strong><a href="#user-content-blk">Blocks</a></strong></p>
2. <p><strong><a href="#user-content-cond">Conditionals</a></strong></p>
3. <p><strong><a href="#user-content-def">Macros</a></strong></p>
##### The Reference Commands
4. <p><strong><a href="#user-content-incl">Includes</a></strong></p>
5. <p><strong><a href="#user-content-ins">Inserts</a></strong></p>

### The 5 Command Components
1. <p><strong><a href="#user-content-rule2">Comment</a></strong></p>
2. <p><strong><a href="#user-content-rule3">Action</a></strong></p>
3. <p><strong><a href="#user-content-rule5">Tag</a></strong></p>
4. <p><strong><a href="#user-content-rule6">ID</a></strong></p>
5. <p><strong><a href="#user-content-rule7">Path</a></strong></p>

### The 7 Command Rules
1. <p><a name="rule1"></a><strong>No Sharing</strong></p><p>A compile <em>command</em> must NOT share a line with any other syntax (e.g. JavaScript or JSDoc).</p>
2. <p><a name="rule2"></a><strong>Start With 3</strong></p><p>A compile <em>command</em> must start with a <em>comment</em> component. A <em>comment</em> component consists of three forward slashes, <code>"///"</code>, followed by at least one space or tab character, <code>" "</code>. The <em>comment</em> component may only be preceded by space or tab characters.</p>
3. <p><a name="rule3"></a><strong>Hash It</strong></p><p>A compile <em>command</em> must use a hash tag, <code>"#"</code>, to start the <em>action</em> component. It must follow the <em>comment</em> component's space or tab character(s) (e.g. <code>"/// #"</code>).</p>
4. <p><a name="rule4"></a><strong>Action Time</strong></p><p>A compile <em>command</em> must act with an <em>action</em> component. The <em>commmand</em> type is defined by the <em>action</em>. The desired <em>action</em> syntax must be specified immediately after the hash tag followed by at least one space or tab character (e.g. <code>"/// #if{{{ "</code> or <code>"/// #include "</code>). See the <em>command</em> sections for each <em>command</em> type's <em>action</em> syntax.</p>
5. <p><a name="rule5"></a><strong>Tag It</strong></p><p>The compile <em>commmand</em> must be tagged with a <em>tag</em> component. A <em>tag</em> component follows the <em>action</em> and must start with an at symbol, <code>"@"</code>, followed by your choice of <em>tag</em> name (only alphanumerics, underscores, dots, and dashes allowed) and at least one space or tab character (e.g. <code>"/// #insert @tagname "</code> or <code>"/// #def}}} @tag-name "</code>).</p>
6. <p><a name="rule6"></a><strong>ID It</strong></p><p>The compile <em>commmand</em> must be a hipster with the <em>ID</em> component. The <em>ID</em> must be assigned after the <em>tag</em>. It may only contain alphanumerics, underscores, dots, dashes, and dollar signs (e.g. <code>"/// #{{{ @tagname uniqueID"</code>) and must be unique to all other <em>command IDs</em> with the SAME <em>tag</em> name and within the SAME <a href="#user-content-file">file</a> or <a href="#user-content-grps">group</a> <em>scope</em> (i.e. if you want to give two <em>commands</em> in the same <em>scope</em> the same <em>ID</em>, you must give them different <em>tag</em> names).</p>
7. <p><a name="rule7"></a><strong>Ref Directions</strong></p><p>The <a href="#user-content-refs">reference</a> <em>command</em> must give directions with a <em>path</em> component to use a <a href="#user-content-grps">group</a> within another <a href="#user-content-file">file</a>. The <em>path</em> component must follow the space or tab character(s) that follow the <em>ID</em> component and must be a relative file path (e.g. <code>"/// #include @tag ID ../path/to/file.js"</code>). Note that space and tab characters are not allowed within file paths.</p>


### GOTO
- [Groups](#user-content-grps)
  - [Blocks](#user-content-blk)
  - [Conditionals](#user-content-cond)
  - [Macros](#user-content-def)
- [References](#user-content-refs)
  - [Includes](#user-content-incl)
  - [Inserts](#user-content-ins)


<a name="grps"></a>
## Groups
Compile groups are how you define sections of code that can be referenced by other files or scopes and that can be flexibly enabled or disabled. Every group has an *open* and *close* command.

### GOTO
- [Block Class](#user-content-blk)
- [Conditional Class](#user-content-cond)
- [Macro Class](#user-content-def)


<a name="blk"></a>
## Block Class

 Constructor | Description
:------------|:------------
 `Blk`       | <ADD-DESCRIP>

<a name="blk-members"></a>
### Block Members

 Member  | Data Type              | Description
:------- |:----------             |:------------
 type    | !Object                | A pointer to a unique object instance designated for each class.
 name    | !string                | The tag's name (e.g. `@tag-name`).
 id      | !string                | The tag's id (e.g. `@tag-name tag-id`).
 hash    | !string                | The hashed result of the tag's and each of its parent's tag name and id (e.g. `"parent-name:parent-id\|child-name:child-id"`).
 open    | !FileLine              | A pointer to opening FileLine instance.
 close   | !FileLine              | A pointer to closing FileLine instance.
 parent  | ?AnyBlockTag           | A pointer to tag's parent tag.
 kids    | !Array\<!AnyTag>       | An ordered `array` of the tags within this tag's scope.
 content | !Array\<!AnyLineOrTag> | An ordered `array` of the lines and tags within this tag's scope.

<a name="blk-methods"></a>
### Block Methods

 Method     | Description
:-------    |:------------


<a name="cond"></a>
### Conditional Class

 Constructor | Description
:------------|:------------
 `Cond`      | <ADD-DESCRIP>

<a name="cond-members"></a>
### Conditional Members

 Member  | Data Type              | Description
:------- |:----------             |:------------
 type    | !Object                | A pointer to a unique object instance designated for each class.
 state   | !boolean               | The tag's state. It is `true` if the tag's name is `"on"`, and it is `false` if the tag's name is `"off"`.
 name    | !string                | The tag's name (e.g. `@tag-name`).
 id      | !string                | The tag's id (e.g. `@tag-name tag-id`).
 hash    | !string                | The hashed result of the tag's and each of its parent's tag name and id (e.g. `"parent-name:parent-id\|child-name:child-id"`).
 open    | !FileLine              | A pointer to opening FileLine instance.
 close   | !FileLine              | A pointer to closing FileLine instance.
 parent  | ?AnyBlockTag           | A pointer to tag's parent tag.
 kids    | !Array\<!AnyTag>       | An ordered `array` of the tags within this tag's scope.
 content | !Array\<!AnyLineOrTag> | An ordered `array` of the lines and tags within this tag's scope.

<a name="cond-methods"></a>
### Conditional Methods

 Method     | Description
:-------    |:------------


<a name="def"></a>
## Macro Class

 Constructor | Description
:------------|:------------
 `Def`       | <ADD-DESCRIP>

<a name="def-members"></a>
### Macro Members

 Member | Data Type          | Description
:-------|:----------         |:------------
 type   | !Object            | A pointer to a unique object instance designated for each class.
 id     | !string            | The MacroDef instance's id (e.g. `@macro id`).
 open   | !FileLine          | A pointer to opening FileLine instance.
 close  | !FileLine          | A pointer to closing FileLine instance.
 lines  | !Array\<!FileLine> | An ordered `array` of the lines within the MacroDef instance's scope.

<a name="def-methods"></a>
### Macro Methods

 Method     | Description
:-------    |:------------


<a name="refs"></a>
## References
<ADD-DESCRIP>

### GOTO
- [Include Class](#user-content-incl)
- [Insert Class](#user-content-ins)


<a name="incl"></a>
## Include Class

 Constructor | Description
:------------|:------------
 `Incl`      | <ADD-DESCRIP>

<a name="incl-members"></a>
### Include Members

 Member  | Data Type          | Description
:------- |:----------         |:------------
| type   | !Object            | A pointer to a unique object instance designated for each class.
| name   | !string            | The tag's name (e.g. `@tag-name`).
| id     | !string            | The tag's id (e.g. `@tag-name tag-id`).
| hash   | !string            | The hashed result of the tag's and each of its parent's tag name and id (e.g. `"parent-name:parent-id\|child-name:child-id"`).
| line   | !FileLine          | A pointer to **defining** FileLine instance.
| file   | !File              | A pointer to the **included** File instance.
| parent | !AnyBlockTag       | A pointer to tag's parent tag.

<a name="incl-methods"></a>
### Include Methods

 Method     | Description
:-------    |:------------


<a name="ins"></a>
## Insert Class

 Constructor | Description
:------------|:------------
 `Ins`       | <ADD-DESCRIP>

<a name="ins-members"></a>
### Insert Members

 Member | Data Type | Description
:-------|:----------|:------------
 type   | !Object   | A pointer to a unique object instance designated for each class.
 id     | !string   | The IncludeMacro instance's id (e.g. `@macro id`).
 line   | !FileLine | A pointer to **defining** FileLine instance.
 file   | !File     | A pointer to the included MacroFile instance.
 def    | !MacroDef | A pointer to the included MacroDef instance.

<a name="ins-methods"></a>
### Insert Methods

 Method     | Description
:-------    |:------------


