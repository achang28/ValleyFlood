/**
 * Created by albertwchang on 1/15/17.
 */
'use strict';

var total, currentMidIndex, currentList;

function updateVal(leftVal) {
	currentMidIndex++;
	const midIndex = currentMidIndex;
	const midVal = currentList[midIndex];
	var rightVal;

	// When leftNode value < = middle index value, continue finding a valid left side
	if (midVal >= leftVal) {
		return 0;
	}

	// check that a right value actually exists within array
	if ((currentList.length - 1) === midIndex) {
		return midVal;
	} else {
		rightVal = currentList[midIndex + 1];
	}

	// See whether right value is short enough to be filled up
	if (rightVal < leftVal) {
		rightVal = updateVal(leftVal);
	}

	const newMidVal = Math.min(leftVal, rightVal);
	const midValDiff = newMidVal - midVal;

	// update accumulated flooding amount
	total += midValDiff;
	currentList[midIndex] = newMidVal;
	return newMidVal;
}

function calcFloodAmt(targetList, listNum) {
	total = 0;
	currentMidIndex = 0;

	// Use fresh copy of list
	currentList = targetList.slice();

	while (currentList.length - 1 > currentMidIndex) {
		updateVal(currentList[currentMidIndex]);
	}

	console.log(`List ${listNum} Total: `, total);
}

const lists = [
	[2, 4, 5, 2, 3, 4, 6, 6, 4, 5],
	[9, 8, 7, 6, 5, 5, 6, 7, 8, 9],
	[3, 2, 1, 2],
	[5, 4, 3, 2, 1, 5],
	[5, 1, 2, 3, 4, 5]
];

lists.forEach(calcFloodAmt);
