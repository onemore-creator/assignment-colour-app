# code-challenge
A code challenge used to assess developers knowledge and skills

### Scenario
A developer has tried to do a task that you must now take over and complete.

After the developer left, the task has been extended with additional requirements that you must also fulfill.

OBS: The API mock must be used and it must NOT be changed.

### Requirements
- It must be possible to run the program and get back the colors green, blue and red in HEX format.
- It must be possible to define the colors using their names like red, blue and green.
- It must be possible to define the order the colors are returned.

### New additional requirements
- The program must support the colors white and black.
- The program must be able to return the RGB values.
- It must be possible to run the program in parallel mode getting and printing all the defined colors at the same time
- It must be possible to run the program in sequential mode getting and printing one of the defined colors at a time
- It must be possible to use a pattern like the following, to run the program: npm start green blue red white black --RGB --seq
- The code must use a functional programming style and avoid the use of classes
- The code should be clean, simple and follow best practices
- There must be documentation about how to run the program


# How-to run it 

## CLI:

```bash
npm install
```

```bash
npm run start -- true false true '["green","blue","red"]'
```

## Docker build 

```bash
docker build -t colours-app .
```

```bash
docker run --rm  colours-app true false true '["green","blue","red"]'
```

# TODO: Add more info 