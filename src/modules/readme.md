Every individual static or dynamic pages component leaves inside this `module` folder. Simply create the following structure when adding a new component that only been used for that page:

```
- module
  - [page-name]
    - components
      - [file].tsx
```

> Note! Every other components that shared and used globally should be placed in the `components` folder outside the `module` directory.
