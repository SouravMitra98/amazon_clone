import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:amazon_clone/features/admin/model/sales.dart';

class CategoryBarChart extends StatelessWidget {
  final List<Sales> salesData;

  const CategoryBarChart({super.key, required this.salesData});

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        borderData: FlBorderData(show: false),
        gridData: FlGridData(show: true),
        titlesData: FlTitlesData(
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 40,
              getTitlesWidget: (value, meta) {
                if (value == 0) return const Text("0");
                if (value % 50000 == 0) return Text("${(value ~/ 1000)}K");
                return const SizedBox.shrink();
              },
            ),
          ),
          rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                final index = value.toInt();
                if (index < salesData.length) {
                  return Text(salesData[index].label);
                }
                return const SizedBox.shrink();
              },
            ),
          ),
        ),
        barTouchData: BarTouchData(
          enabled: true,
          touchTooltipData: BarTouchTooltipData(
            getTooltipItem: (group, groupIndex, rod, rodIndex) {
              final sale = salesData[group.x.toInt()];
              return BarTooltipItem(
                "${sale.label}\n₹${sale.earning}",
                const TextStyle(color: Colors.white),
              );
            },
          ),
        ),
        barGroups: salesData.asMap().entries.map((entry) {
          final index = entry.key;
          final sale = entry.value;
          return BarChartGroupData(
            x: index,
            barRods: [
              BarChartRodData(
                toY: sale.earning.toDouble(),
                color: Colors.blue,
                width: 18,
              ),
            ],
          );
        }).toList(),
      ),
    );
  }
}

class CategoryPieChart extends StatelessWidget {
  final List<Sales> salesData;

  const CategoryPieChart({super.key, required this.salesData});

  @override
  Widget build(BuildContext context) {
    return PieChart(
      PieChartData(
        sectionsSpace: 2,
        centerSpaceRadius: 40,
        sections: salesData.map((sale) {
          final color = Colors
              .primaries[salesData.indexOf(sale) % Colors.primaries.length];
          return PieChartSectionData(
            color: color,
            value: sale.earning.toDouble(),
            title: "${sale.label}\n${sale.earning}",
            radius: 60,
            titleStyle: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          );
        }).toList(),
      ),
    );
  }
}

class CategoryLineChart extends StatelessWidget {
  final List<Sales> salesData;

  const CategoryLineChart({super.key, required this.salesData});

  @override
  Widget build(BuildContext context) {
    return LineChart(
      LineChartData(
        borderData: FlBorderData(show: true),
        gridData: FlGridData(show: true),
        titlesData: FlTitlesData(
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 40,
              getTitlesWidget: (value, meta) {
                if (value == 0) return const Text("0");
                if (value % 50000 == 0) return Text("${(value ~/ 1000)}K");
                return const SizedBox.shrink();
              },
            ),
          ),
          rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                final index = value.toInt();
                if (index < salesData.length) {
                  return Text(salesData[index].label);
                }
                return const SizedBox.shrink();
              },
            ),
          ),
        ),
        lineBarsData: [
          LineChartBarData(
            spots: salesData.asMap().entries.map((entry) {
              return FlSpot(
                entry.key.toDouble(),
                entry.value.earning.toDouble(),
              );
            }).toList(),
            isCurved: true,
            barWidth: 3,
            dotData: FlDotData(show: true),
            color: Colors.green,
          ),
        ],
      ),
    );
  }
}
