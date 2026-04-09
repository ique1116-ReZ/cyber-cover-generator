#!/bin/bash

# 抖音封面生成器 - 启动脚本
# 这个脚本会启动开发服务器并自动在浏览器中打开应用

# 切换到项目目录
cd "$(dirname "$0")"

# 检查 node_modules 是否存在，如果不存在则安装依赖
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install
fi

# 启动开发服务器并在后台运行
echo "正在启动抖音封面生成器..."
npm run dev &

# 获取进程 ID
SERVER_PID=$!

# 等待服务器启动（大约 3 秒）
sleep 3

# 在默认浏览器中打开应用
echo "正在打开浏览器..."
open http://localhost:3000

# 等待用户按键后关闭服务器
echo ""
echo "========================================="
echo "抖音封面生成器已启动！"
echo "浏览器地址: http://localhost:3000"
echo "========================================="
echo ""
echo "按 Ctrl+C 关闭服务器..."

# 等待用户中断
wait $SERVER_PID
