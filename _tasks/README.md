# The Makefile & Its Tasks
This directory consists of tasks called by a custom [makefile](https://github.com/imaginate/vitals/blob/master/make.js). Each script in this directory must export one [Task object](https://github.com/imaginate/vitals/blob/master/_tasks/_helpers/task.js) with at least one method. Below are instructions for using the makefile and its tasks.
- [Overview](#overview)
- [Examples](#examples)
- [Shortcuts](#shortcuts)
- [Methods](#methods)
- [Values](#values)


## Overview
Use the following to execute makefile tasks:
```bash
$ cd <vitals-root>
$ node make <task>[-method][=val] <task>[-method][=val]
```
Tasks are executed in the order given and may be repeated. You may view each task's source code in the [tasks directory](https://github.com/imaginate/vitals/tree/master/_tasks) (each task is saved as ``` <taskname>.js ```).


## Examples
```bash
## The two dashes preceding each task are optional
$ node make --task
$ node make --task-method
$ node make --task-method-method
$ node make --task-method=value
$ node make --task=defaultValue-method-method
$ node make --task=defaultValue-method-method-method=value
```


## Shortcuts
| Shortcut                 | Command Equivalent                    |
| :----------------------- | :------------------------------------ |
| ```$ node make ```       | ```$ node make --dev ```              |
| ```$ node make --dev ``` | ```$ node make --compile --minify ``` |


## Methods
| Task    | Methods                                 | Default Methods  |
| :------ | :-------------------------------------- | :--------------- |
| compile | browser,sections                        | browser,sections |
| minify  | browser                                 | browser          |
| test    | methods,method,sections,section,browser | method           |
| version | all                                     | all              |


## Values
| Task    | Method                           | Value            | Example                                      |
| :------ | :------------------------------- | :--------------- | :------------------------------------------- |
| test    | method                           | Vitals Method    | ```$ node make --test-method=each ```        |
| test    | section                          | Vitals Section   | ```$ node make --test-method=js ```          |
| test    | methods,<br>sections,<br>browser | Mocha Options    | ```$ node make --test=bail+reporter=spec ``` |
| version | all                              | Semantic Version | ```$ node make --version=1.2.4 ```           |


<br>
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/vitals"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
