// 思路：输入数组并建立小顶堆，此时最小元素位于堆顶。不断执行出堆操作，依次记录出堆元素，即可得到从小到大排序的序列。

// 构建最大堆
function buildMaxHeap(arr) {
  const len = arr.length;
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(arr, len, i);
  }
}

// 调整堆
function heapify(arr, len, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    swap(arr, i, largest);
    heapify(arr, len, largest);
  }
}

// 交换元素
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 堆排序
function heapSort(arr) {
  const len = arr.length;

  buildMaxHeap(arr);
  // 从堆中提取最大元素，循环 n-1 轮
  for (let i = len - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapify(arr, i, 0);
  }

  return arr;
}


const array = [4, 5, 7, 3, 2, 1, 3, 6];
heapSort(array)
console.log(array);