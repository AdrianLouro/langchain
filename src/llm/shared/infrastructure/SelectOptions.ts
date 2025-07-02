export function createSelectOptions<T extends object>(
  enumObject: T,
): Array<T[keyof T]> {
  return Object.values(enumObject);
}

export function setSelectOptionsFromEnum<T extends object>(
  select: HTMLSelectElement,
  enumObject: T,
) {
  select.innerHTML = '';
  createSelectOptions(enumObject).forEach((value) => {
    select.appendChild(
      Object.assign(document.createElement('option'), {
        value: value,
        textContent: value,
      }),
    );
  });
}
